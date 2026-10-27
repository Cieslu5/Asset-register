# asset-register

Ewidencja sprzętu firmowego (mini ERP). Monolit modułowy: `apps/web` (Next.js), `packages/core`
(domena i przypadki użycia), `packages/db` (Drizzle, migracje, RLS), `packages/ui` (jedyne źródło komponentów).

## Architektura

- Zależności tylko w dół: `web` → `core` → `db`. `core/src/domain` to czyste funkcje bez importów spoza `domain/`.
- Logika biznesowa tylko w przypadkach użycia. Komponent i Server Action jej nie zawierają.
- Każdy zapis: `assertCan`, zod, transakcja przez `withOrganization`, wpis historii, `revalidateTag`.
- Organizacja zawsze z sesji, nigdy z formularza. Edytowane rekordy mają `version`.
- Błąd domenowy zamienia na wynik tylko `toResult` z `@repo/core`.

## Kod

- TypeScript strict, bez `any`, `@ts-ignore`, `as unknown as`.
- Walidacja na granicach, w środku ufamy typom. Bez `try/catch` na zapas.
- Komentarz tylko gdy wyjaśnia „dlaczego”. Bez komentarzy z historią zmian.
- Wspólna funkcja dopiero przy trzecim powtórzeniu. Bez abstrakcji na przyszłość.

## UI

- Widoki tylko z komponentów `@repo/ui`. Brakuje komponentu: dodaj go do `packages/ui`.
- Kolory, promienie, cienie tylko z `packages/ui/src/tokens.css`. Jeden akcent.
- Ikony tylko z Lucide (marki: Simple Icons) przez komponenty z `@repo/ui`. Bez własnych SVG i emoji.
- Status słowem, nie tylko kolorem. Liczby `tabular-nums`. Widok sprawdzony od 375 px.
- Bez gradientów, plakietek nad nagłówkami, kursywy w nagłówkach, kart w kartach, ruchu dla ozdoby.
- Bez potwierdzeń przy akcjach odwracalnych, bez toastu, gdy efekt widać.

## Tekst

- Wszystkie teksty przez next-intl (`apps/web/messages`). Przycisk to czasownik.
- Bez pauz i półpauz. Bez słów: kompleksowy, bezproblemowo, seamless, robust, leverage.
- Commity po angielsku, w trybie rozkazującym, małe.

## Polecenia

- `docker compose up -d`, potem `pnpm db:migrate` i `pnpm dev`.
- Przed commitem: `pnpm lint`, `pnpm typecheck`, `pnpm test`.
