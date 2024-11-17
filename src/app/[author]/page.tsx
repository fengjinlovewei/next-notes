import Home from '@/components/Home';

interface Props {
  params: { author: string };
}

export default async function Page({ params }: Props) {
  const username = params.author;

  return <Home username={username} />;
}
