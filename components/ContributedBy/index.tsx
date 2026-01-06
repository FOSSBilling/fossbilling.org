// The original idea is from the Symfony blog: https://symfony.com/blog

export function ContributedBy({ username, pullRequestNumber }: { username: string; pullRequestNumber: number | string }) {
    const userLink = `https://github.com/${username}`;
    const pullRequestLink = `https://github.com/FOSSBilling/FOSSBilling/pull/${pullRequestNumber}`;
    const avatarLink = `https://avatars.githubusercontent.com/${username}`;

    return (
        <div className="flex float-right items-center p-2 ms-4 mb-4 mt-6 w-56 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 rounded-md">
            <div className="inline-block">
                <a href={userLink} target="_blank" rel="noopener">
                    <img className="rounded-md h-10 w-10" src={avatarLink} alt={username}/>
                </a>
            </div>
            <div className="flex ml-3">
                <p className="text-xs">
                    Contributed by <br /><a className="text-blue-400 hover:text-blue-500 hover:underline" href={userLink} target="_blank" rel="noopener">{username}</a> in <a className="text-blue-400 hover:text-blue-500 hover:underline" href={pullRequestLink} target="_blank" rel="noopener">#{pullRequestNumber}</a>.
                </p>
            </div>
        </div>
    );
}
