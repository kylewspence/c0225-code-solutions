type BannerProps = {
  item: string;
  className: string;
};

export function Banner({ item }: BannerProps) {
  return <div>{item}</div>;
}
