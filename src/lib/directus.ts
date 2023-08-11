import { Directus } from "@directus/sdk"
import getConfig from "next/config"

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const { url } = publicRuntimeConfig;
const { email, password, token } = serverRuntimeConfig;

type News = {
  id: string
  title: string
  thumbnail: string
  date_created: Date
  date_updated: Date
  user_created: string
  draft: Boolean
  content: string
}

type Member = {
  username: string
  projects: Array<string>
  description: string | null
  homepage: string | null
  twitter: string | null
  youtube: string | null
  github: string | null
  discord: string | null
  avatar: string
}

type Collections = {
  news: News
  members: Member
};


const directus = new Directus<Collections>(url);

export async function getDirectusClient() {
  if (email && password) {
    await directus.auth.login({ email, password });
  } else if (token) {
    await directus.auth.static(token);
  }

  return directus;
}