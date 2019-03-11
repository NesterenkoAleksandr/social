export interface User {
  _id: string;
  email?: string;
  password?: string;
  nickname?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone?: string;
  gender_orientation?: string;
  city?: string;
  date_of_birth_day?: string;
  date_of_birth_month?: string;
  date_of_birth_year?: string;
  country: string;
  avatar?: string;
  picture?: string;
  photos?: string;
  cover?: string;
  images: Array<string>;
  email_on_comments: boolean;
  email_on_comments_reply: boolean;
  email_on_every_challenge: boolean;
  email_on_likes: boolean;
  email_on_new_challenges_once_week: boolean;
  email_on_new_followers: boolean;
  email_weekly_articles: boolean;
  email_is_active?: boolean;
  expert_photos?: number;
  favourites?: Array<string>;
  followers?: Array<string>;
  followings?: Array<string>;
  glories?: Array<string>;
  is_blocked?: boolean;
  is_deactivated?: boolean;
  is_deleted?: boolean;
  my_images?: Array<string>;
  paypal_id?: string;
  points?: number;
  rank?: any;
  register_date?: string;
  type?: string;
}

export interface Follows {
  counts: number;
  users: Array<{
    avatar: string;
    city: string;
    cover: string;
    full_name: string;
    _id: string;
  }>;
}
