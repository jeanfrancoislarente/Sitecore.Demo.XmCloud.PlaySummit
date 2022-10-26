export type DiscoverResponseFacet = {
  id: string;
  text: string;
  count: number;
};
export interface DiscoverResponseBase {
  content: unknown[];
  facet?: {
    [key in string]: {
      label: string;
      value: DiscoverResponseFacet[];
    };
  };
}
export interface DiscoverResponse<T extends unknown> extends DiscoverResponseBase {
  content: T[];
}
