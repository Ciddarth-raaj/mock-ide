export const getGitStatusStyle = (gitStatus?: string | null, gitIgnored?: boolean) => {
  if (gitIgnored) {
    return { opacity: 0.2 };
  }

  if (gitStatus === 'modified') {
    return { color: 'var(--gitModified)' };
  }

  if (gitStatus === 'untracked') {
    return { color: 'var(--gitUntracked)' };
  }

  return { color: 'var(--fontColor)' };
};
