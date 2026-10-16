import Head from 'expo-router/head';

type Props = {
  title?: string;
  description?: string;
};

export function SEO({ title, description }: Props) {
  const fullTitle = title ? `${title} | غاز أرون` : 'غاز أرون - توصيل أسطوانات الغاز';
  const desc = description || 'اطلب أسطوانة غاز الطبخ واستبدلها بسهولة. توصيل سريع لباب بيتك.';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}
