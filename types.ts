

export type Props = {
  user: {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    public_repos: number;
    followers: number;
    following: number;
  },
  repos: [
    {
      name: string;
      private: boolean;
      homepage: string | null;
      topics: [];
    }
  ],
  reposdata: []
};

export type Repo = {
  repo: {
    name: string;
    private: boolean;
    homepage: string | null;
    topics: [];
  }
}