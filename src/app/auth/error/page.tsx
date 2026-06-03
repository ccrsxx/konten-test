import { Suspense } from 'react';

async function ErrorContent({
  searchParams
}: {
  searchParams: Promise<{ error: string }>;
}): Promise<React.JSX.Element> {
  const params = await searchParams;

  return (
    <>
      {params?.error ? (
        <p className='text-sm text-muted-foreground'>
          Kode error: {params.error}
        </p>
      ) : (
        <p className='text-sm text-muted-foreground'>
          Terjadi kesalahan yang tidak diketahui.
        </p>
      )}
    </>
  );
}

export default function Page({
  searchParams
}: {
  searchParams: Promise<{ error: string }>;
}): React.JSX.Element {
  return (
    <section className='mx-auto grid w-full max-w-md gap-6 border border-border p-8 rounded-md'>
      <h1 className='text-2xl font-bold text-accent-main'>
        Maaf, Terjadi Kesalahan
      </h1>
      <Suspense>
        <ErrorContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
