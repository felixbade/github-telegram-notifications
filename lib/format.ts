import { htmlEscape } from './telegram'

export const formatEvent = (body: any, event: string) => {
    // https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#ping
    if (event === 'ping') {
        let name, url
        if (body.repository !== undefined) {
            name = body.repository.name
            url = body.repository.html_url
        } else if (body.organization !== undefined) {
            name = body.organization.login
            url = `https://github.com/${name}`
        } else {
            return
        }
        const title = `<a href="${url}">${htmlEscape(name)}</a>`
        return `👀 Started watching <b>${title}</b>`
    }

    if (event === 'issues') {
        if (body.action === 'opened') {
            const title = `<a href="${body.issue.html_url}">${htmlEscape(body.issue.title)}</a>`
            const message = body.issue.body
            const author = body.issue.user.login
            const repo = body.repository.name
            let formatted = `🍗 New issue <b>${title}</b> in <b>${repo}</b> by <b>${author}</b>`
            if (message !== null) {
                formatted += `\n\n${message}`
            }
            return formatted
        }

        if (body.action === 'closed') {
            const title = `<a href="${body.issue.html_url}">${htmlEscape(body.issue.title)}</a>`
            const author = body.issue.user.login
            const repo = body.repository.name
            return `🦴 Closed issue <b>${title}</b> in <b>${repo}</b> by <b>${author}</b>`
        }
    }

    if (body.commits !== undefined) {
        return formatCommits(body)
    }

    if (body.pull_request !== undefined) {
        return formatPullRequest(body)
    }
}

export const formatCommits = (body: any) => {
    const repositoryName = body.repository.name
    const branch = body.ref.replace('refs/heads/', '')

    // 🧹 Deleted branch feature-1 from repo
    if (body.deleted) {
        return `🧹 Deleted branch <b>${branch}</b> from <b>${repositoryName}</b>`
    }

    let numberOfCommits
    if (body.commits.length === 1) {
        numberOfCommits = `1 new commit`
    } else {
        numberOfCommits = `${body.commits.length} new commits`
    }

    const commitsText = body.commits.map((commit) => {
        const commitHash = commit.id.substring(0, 7);
        const message = htmlEscape(commit.message)
        const author = commit.author.name
        return `<a href="${commit.url}">${commitHash}</a>: ${message} by <b>${author}</b>`
    }).join('\n\n')

    let branchDescription = `branch <b>${branch}</b>`
    if (body.created) {
        branchDescription = `${branchDescription} (new branch)`
    }
    
    let formattedMessage = `🎾 ${numberOfCommits} to <b>${repositoryName}</b> ${branchDescription}\n\n${commitsText}`

    if (body.forced) {
        formattedMessage = '🤜 Force push\n' + formattedMessage
    }

    return formattedMessage
}

export const formatPullRequest = (body: any) => {
    const repositoryName = body.repository.name
    const pr = body.pull_request
    const title = `<a href="${pr.html_url}">${htmlEscape(pr.title)}</a>`

    const oldBranch = pr.head.ref
    const newBranch = pr.base.ref
    const branchText = `${oldBranch} → ${newBranch}`

    if (body.action === 'opened') {
        const author = pr.user.login
        return `🚚 New pull request ${title} in <b>${repositoryName}</b> by <b>${author}</b>\n${branchText}`
    }

    if (body.action === 'closed') {
        const user = body.sender.login
        let formattedMessage = `${title} in <b>${repositoryName}</b> by <b>${user}</b>\n${branchText}`
        if (pr.merged) {
            return '✅ Merged pull request ' + formattedMessage
        } else {
            return '🚫 Rejected pull request ' + formattedMessage
        }
    }

    //body.comment.body -> selitys
    return undefined
}