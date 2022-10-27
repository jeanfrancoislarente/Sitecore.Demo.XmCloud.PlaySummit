import { QueryClient } from '@tanstack/react-query';
import { DiscoverNews } from '../interfaces/DiscoverNews';
import { DiscoverResponseSortChoice } from '../interfaces/DiscoverResponse';
import { DiscoverSession } from '../interfaces/DiscoverSession';
import { DiscoverSpeaker } from '../interfaces/DiscoverSpeaker';
import { DiscoverSponsor } from '../interfaces/DiscoverSponsor';
import { DiscoverVendor } from '../interfaces/DiscoverVendor';
import { News } from '../types/news';
import { GraphQLSession } from '../types/session';
import { GraphQLSpeaker } from '../types/speaker';
import { Sponsor } from '../types/sponsor';
import { Vendor } from '../types/vendor';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
});

export const getAbsoluteUrlPath = (url: string): string => {
  const [, path] = String(url).match(/^https?:\/\/[^/]+(.+)$/) || [];
  return path || url;
};
export const getUrlFromName = (type: string, name: string): string =>
  `/${type}/${name.replaceAll(' ', '-')}`;

const SORTING_OPTIONS: Record<'session' | 'vendor' | 'content' | 'sponsor' | 'speaker', string[]> =
  {
    content: ['featured_desc', 'content_name_desc', 'featured_desc'],
    session: ['name_asc', 'name_desc', 'featured_desc', 'price_asc', 'price_desc'],
    vendor: ['name_asc', 'name_desc', 'featured_desc', 'price_asc', 'price_desc'],
    sponsor: ['name_asc', 'name_desc', 'featured_desc', 'price_asc', 'price_desc'],
    speaker: ['name_asc', 'name_desc', 'featured_desc', 'price_asc', 'price_desc'],
  };

export const getSortingOptions = (
  type: 'session' | 'vendor' | 'content' | 'sponsor' | 'speaker',
  options: DiscoverResponseSortChoice[]
): DiscoverResponseSortChoice[] =>
  options.filter(({ name }) => SORTING_OPTIONS[type].includes(name));

const list = <T>(l: T[]): T[] => l || [];

export const sessionAdapter = ({
  name,
  url,
  image_url,
  is_premium,
  rooms = [],
  days = [],
  speakers = [],
  time_slots = [],
}: DiscoverSession): GraphQLSession => ({
  name: { value: name },
  premium: { value: is_premium },
  url: { path: getAbsoluteUrlPath(url) },
  image: {
    jsonValue: { value: { src: image_url } },
  },
  imageTransformation: {
    value: image_url,
  },
  speakers: {
    targetItems: list(speakers).map((value) => ({
      name: { value },
      jobTitle: { value: '' },
      url: {
        path: getUrlFromName('speaker', value),
      },
    })),
  },
  rooms: {
    targetItems: list(rooms).map((value) => ({
      name: { value },
    })),
  },
  day: {
    targetItems: list(days).map((value) => ({
      name: { value },
    })),
  },
  timeslots: {
    targetItems: list(time_slots).map((value) => ({
      name: { value },
    })),
  },
});

export const speakerAdapter = ({
  name,
  url,
  is_featured,
  image_url,
  job_title,
}: DiscoverSpeaker): GraphQLSpeaker => ({
  name: { value: name },
  jobTitle: { value: job_title },
  featured: { value: is_featured },
  url: { path: getAbsoluteUrlPath(url) },
  picture: {
    jsonValue: { value: { src: image_url } },
  },
});

export const vendorAdapter = ({ name, url, level, image_url }: DiscoverVendor): Vendor => ({
  url,
  fields: {
    Name: { value: name },
    Level: { value: level },
    Logo: {
      value: { src: image_url },
    },
  },
});

export const sponsorAdapter = ({ name, url, image_url }: DiscoverSponsor): Sponsor => ({
  url,
  fields: {
    Name: { value: name },
    Logo: {
      value: { src: image_url },
    },
  },
});

export const newsAdapter = ({
  publish_date,
  excerpt,
  name,
  url,
  image_url,
}: DiscoverNews): News => ({
  url: getAbsoluteUrlPath(url),
  name: { value: name },
  fields: {
    Title: { value: name },
    Excerpt: { value: excerpt },
    PublishDate: { value: publish_date },
    Image: {
      value: { src: image_url },
    },
  },
});
