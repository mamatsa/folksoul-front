export type BandMember = {
  _id: string;
  name: string;
  instrument: string;
  orbitWidth: number;
  color: string;
  bio: string;
  avatarUrl?: string;
};

export type BandMemberInputs = {
  name: string;
  instrument: string;
  orbitWidth: number;
  color: string;
  bio: string;
};
