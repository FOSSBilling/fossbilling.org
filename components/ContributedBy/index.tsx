// The original idea is from the Symfony blog: https://symfony.com/blog

export function ContributedBy({ username, pullRequestNumber }) {
    const userLink = `https://github.com/${username}`;
    const pullRequestLink = `https://github.com/FOSSBilling/FOSSBilling/pull/${pullRequestNumber}`;
    const avatarLink = `https://avatars.githubusercontent.com/${username}`;

    return (
        <div className="flex float-right items-center p-2 ms-4 mb-4 w-56 bg-zinc-800 rounded-md nx-mt-6">
            <div className="inline-block">
                <a href={userLink} target="_blank">
                    <img className="rounded-md h-10 w-10" src={avatarLink} alt={username}/>
                </a>
            </div>
            <div className="flex ml-3">
                <p className="text-xs">
                    Contributed by <br /><a className="text-blue-400 hover:text-blue-500 hover:underline" href={userLink} target="_blank">{username}</a> in <a className="text-blue-400 hover:text-blue-500 hover:underline" href={pullRequestLink} target="_blank">#{pullRequestNumber}</a>.
                </p>
            </div>
        </div>
    );
}