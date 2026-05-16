import { getAboutPageData } from "#/server/strapi-functions";
import { queryOptions } from "@tanstack/react-query";

export const aboutPageQueryOptions = () =>
  queryOptions({
    queryKey: ["about-page"],
    queryFn: () => getAboutPageData(),
  });
