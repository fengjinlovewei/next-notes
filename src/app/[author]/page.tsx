import Home from '@/components/Home';

export default async function Page({ params }: PageProps<{ author: string }>) {
  const { author } = await params;

  return <Home username={author} />;
}
