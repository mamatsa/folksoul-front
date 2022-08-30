export type SocialLink = {
  _id: string;
  name: string;
  link: string;
  iconUrl?: string;
};

export type SocialLinkInputs = {
  name: string;
  link: string;
};
