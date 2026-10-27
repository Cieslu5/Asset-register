import { Heading, Stack, Text } from '@repo/ui';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(use(params).locale);
  const t = useTranslations('app');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Stack as="main" gap="sm">
        <Heading level={1}>{t('name')}</Heading>
        <Text variant="muted">{t('description')}</Text>
      </Stack>
    </div>
  );
}
