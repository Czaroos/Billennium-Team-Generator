export const Role: { [key: string]: string } = {
  Forward: 'forward',
  Midfield: 'midfield',
  Defence: 'defence',
  Goalkeeper: 'goalkeeper',
};

export const Skill: { [key: string]: string } = {
  Beginner: 'beginner',
  Amateur: 'amateur',
  Experienced: 'experienced',
  Advanced: 'advanced',
  Professional: 'professional',
};

export interface UserInterface {
  _id?: string;
  name: string;
  skill: string;
  role: string;
  isSmall?: boolean;
}
