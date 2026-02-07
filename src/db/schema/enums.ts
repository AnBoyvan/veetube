import { pgEnum } from 'drizzle-orm/pg-core';

export const reactionsType = pgEnum('reaction_type', ['like', 'dislike']);
