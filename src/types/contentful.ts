import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCreatorsFields {
  username: EntryFieldTypes.Symbol;
  description?: EntryFieldTypes.Symbol;
  avatar: EntryFieldTypes.AssetLink;
  projects?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Bot開発" | "Linux開発" | "Web開発" | "ソフトウェア開発" | "デザイン" | "効果音制作" | "動画制作">>;
  homepage?: EntryFieldTypes.Symbol;
  twitter?: EntryFieldTypes.Symbol;
  youtube?: EntryFieldTypes.Symbol;
  github?: EntryFieldTypes.Symbol;
  discord?: EntryFieldTypes.Symbol;
}

export type TypeCreatorsSkeleton = EntrySkeletonType<TypeCreatorsFields, "creators">;
export type TypeCreators<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCreatorsSkeleton, Modifiers, Locales>;

export interface TypeNewsFields {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    date_created?: EntryFieldTypes.Date;
    thumbnail?: EntryFieldTypes.AssetLink;
    content: EntryFieldTypes.RichText;
}

export type TypeNewsSkeleton = EntrySkeletonType<TypeNewsFields, "news">;
export type TypeNews<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNewsSkeleton, Modifiers, Locales>;
