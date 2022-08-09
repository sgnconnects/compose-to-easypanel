/**
 * this code defines the diffrent easypanel schemas
 * This Code comes from the github repo easypanel/easypanel-templates
 * main contributor and developer of easypanel: https://github.com/deiucanta
 */

import { z } from "zod";
import {
  appSchema,
  mongoSchema,
  mysqlSchema,
  postgresSchema,
  redisSchema,
  singleServiceSchema,
  templateSchema,
} from "./schema";

export type AppService = z.input<typeof appSchema>;
export type MySQLService = z.input<typeof mysqlSchema>;
export type MongoService = z.input<typeof mongoSchema>;
export type PostgresService = z.input<typeof postgresSchema>;
export type RedisService = z.input<typeof redisSchema>;
export type Template = z.input<typeof templateSchema>;
export type Services = Template["services"];
export type TemplateSchema = z.input<typeof templateSchema>;
export type SingleServiceSchema = z.input<typeof singleServiceSchema>;
