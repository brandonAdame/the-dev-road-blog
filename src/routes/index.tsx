import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="overflow-hidden sm:px-10 sm:py-14 flex gap-4 items-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 112 114"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke-width="4px"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M89.5651 87L65.6451 100.64L46.2651 111.69L38.5551 98.54L68.8651 81.26L2.96509 43.21V30.79L68.8651 68.84L60.9151 55.12L50.0951 36.45L38.5551 16.55L46.2651 12.31L65.3751 45.28L76.2051 63.95L82.5351 74.87L89.5651 87Z"
            stroke="#229EFF"
            stroke-linejoin="round"
          />
          <path
            d="M109.565 77L89.5651 87L82.5351 74.87L76.2051 63.95L65.3751 45.28L46.2651 12.31L66.2651 2.31L109.565 77Z"
            stroke="#229EFF"
            stroke-linejoin="round"
          />
          <path
            d="M109.565 77L66.2651 101.69L46.2651 111.69L65.6451 100.64L89.5651 87L109.565 77Z"
            stroke="#229EFF"
            stroke-linejoin="round"
          />
          <path
            d="M68.8651 68.84L2.96509 30.79L22.9651 20.79L50.0951 36.45L60.9151 55.12L68.8651 68.84Z"
            stroke="#229EFF"
            stroke-linejoin="round"
          />
        </svg>
        <div>
          <p className="island-kicker mb-3">Welcome to</p>
          <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-wide text-(--sea-ink) sm:text-6xl">
            TheDevRoad
          </h1>
        </div>
      </section>
      <section className="max-w-3xl">
        <h1 className="display-title text-4xl font-semibold tracking-wide mb-4">
          About
        </h1>
        <p className="font-(--font-made-carving) text-lg tracking-wide rise-in">
          TheDevRoad is a blog about web development, software engineering, and
          the journey of becoming a better developer. I share insights, tips,
          and stories from my own experiences in the tech industry. Whether
          you're a beginner or an experienced developer, I hope to provide
          valuable content that helps you on your own dev road.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            "Type-Safe Routing",
            "Routes and links stay in sync across every page.",
          ],
          [
            "Server Functions",
            "Call server code from your UI without creating API boilerplate.",
          ],
          [
            "Streaming by Default",
            "Ship progressively rendered responses for faster experiences.",
          ],
          [
            "Tailwind Native",
            "Design quickly with utility-first styling and reusable tokens.",
          ],
        ].map(([title, desc], index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-base font-semibold text-(--sea-ink)">
              {title}
            </h2>
            <p className="m-0 text-sm text-(--sea-ink-soft)">{desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
