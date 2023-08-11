import NextAuth from 'next-auth';
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        authorization: { params: { scope: 'identify guilds guilds.members.read' } },
      })
  ],
  callbacks: {
    signIn: async ({account}) => {
      const guild_id = "814857779675529237"
      const res = await fetch(`https://discord.com/api/users/@me/guilds/${guild_id}/member`, {
        headers: {
          Authorization: "Bearer " + account.access_token
        }
      })
      return await res.ok
    },
    session: async ({ session, token }) => {
        if (session?.user) {
          session.user.id = token.uid;
        }
        return session;
      },
      jwt: async ({ user, token }) => {
        if (user) {
          token.uid = user.id;
        }
        return token;
      },
  },
  session: {
    strategy: 'jwt',
  },
});