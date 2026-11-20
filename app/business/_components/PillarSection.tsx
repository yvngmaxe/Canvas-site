import type { ReactNode } from "react";
import Image from "next/image";
import torinomeLogo from "@/public/images/business/torinome-logo-p12.svg";
import styles from "../page.module.css";
import {
  torinome,
  SHOW_SPEAKER_NAMES,
  type Pillar,
  type Case,
  type Photo,
  type FlowBlock,
  type FlowCol,
  type Tone,
} from "../data";

// 事業内容の「柱ひとつ分」の表示（赤い帯の見出し・できること・事例・トリノメ）。
// もとは /business の1ページに4本柱を縦に並べていたもの。作り直しの途中で、柱ごとのページから使う。
// 文章は ../data.ts（パンフレットの文面どおり）

const toneClass: Record<Tone, string> = {
  accent: styles.toneAccent,
  ink: styles.toneInk,
  sub: styles.toneSub,
  soft: styles.toneSoft,
};

/* 柱ひとつ分。children を渡すと、事例の部分をそれに置きかえる（柱のページでは事例カード） */
export function PillarSection({
  pillar,
  children,
}: {
  pillar: Pillar;
  children?: ReactNode;
}) {
  const detailed = pillar.cases?.some((c) => c.background);
  return (
    <section
      id={pillar.id}
      className={styles.section}
      aria-labelledby={`${pillar.id}-title`}
    >
      {/* パンフレットと同じ「赤い帯」の見出し */}
      <header className={styles.band}>
        <p className={styles.kicker}>{pillar.number}</p>
        <div className={styles.headerBody}>
          <h2 id={`${pillar.id}-title`} className={styles.title}>
            {pillar.title}
          </h2>
          <p className={styles.lead}>{pillar.lead}</p>
          {/* 01・02 の「できること」はパンフと同じく帯の中に */}
          {pillar.canDo && !pillar.canDo.some((c) => c.text) && (
            <ul className={styles.bandTags} aria-label="できること">
              {pillar.canDo.map((c) => (
                <li key={c.label} className={styles.bandTag}>
                  {c.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {pillar.target && <span className={styles.targetPill}>{pillar.target}</span>}
      </header>

      {pillar.question && <BigQuestion lines={pillar.question} />}

      {/* 03 の「できること」（説明つき）は帯の下に3列で */}
      {pillar.canDo && pillar.canDo.some((c) => c.text) && (
        <div className={styles.block}>
          <h3 className={styles.blockHeading}>できること</h3>
          <ul className={styles.canDoGrid}>
            {pillar.canDo.map((c) => (
              <li key={c.label} className={styles.canDoItem}>
                <span className={styles.tag}>{c.label}</span>
                {c.text && <p className={styles.canDoText}>{c.text}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {children ?? (
        <>
          {pillar.cases && detailed && (
            <div className={styles.caseStack}>
              {pillar.cases.map((c) => (
                <CaseDetail key={c.title} item={c} pillarLabel={`${pillar.number} ${pillar.title}`} />
              ))}
            </div>
          )}

          {pillar.cases && !detailed && (
            <div className={styles.block}>
              <h3 className={styles.blockHeading}>事例</h3>
              <div
                className={`${styles.caseGrid} ${
                  pillar.id === "field" ? styles.caseGridFeature : ""
                }`}
              >
                {pillar.cases.map((c) => (
                  <CaseCard key={c.title} item={c} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

/* ───────────── 共通の小さな部品 ───────────── */

function BigQuestion({ lines }: { lines: string[] }) {
  return (
    <p className={styles.bigQuestion}>
      {lines.map((line, i) => (
        <span key={line} className={i > 0 ? styles.bigQuestionShift : undefined}>
          {line}
        </span>
      ))}
    </p>
  );
}

function MetaList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className={styles.metaList}>
      {items.map((m, i) => (
        <div key={`${i}-${m.label}`} className={styles.metaRow}>
          <dt>{m.label}</dt>
          <dd>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 「背景」「ねらい」などの小見出し（赤い明朝＋右に線） */
function Heading({ children, level = 4 }: { children: string; level?: 3 | 4 | 5 }) {
  const Tag = `h${level}` as const;
  return <Tag className={styles.blockHeading}>{children}</Tag>;
}

/** ねらい・工夫の見出し（紺の太字＋黄色マーカー） */
function Marker({ children }: { children: string }) {
  // 外側の span がレイアウト上の箱、内側がマーカー（2行になっても行ごとに引かれる）
  return (
    <span className={styles.markerWrap}>
      <span className={styles.marker}>{children}</span>
    </span>
  );
}

/* ───────────── 01・02 の事例（パンフの1ページ分を1枚に） ───────────── */

/** 「● ── 01 教材・カリキュラム開発 ／ 事例」（どの柱の事例か） */
function CaseKicker({ pillarLabel }: { pillarLabel: string }) {
  return (
    <p className={styles.caseKicker}>
      <span aria-hidden className={styles.caseKickerLine} />
      {pillarLabel} ／ 事例
    </p>
  );
}

function CaseDetail({ item, pillarLabel }: { item: Case; pillarLabel: string }) {
  return (
    <article className={styles.caseDetail}>
      <div className={styles.caseDetailTop}>
        <CaseKicker pillarLabel={pillarLabel} />
        {item.target && <span className={styles.caseTargetPill}>{item.target}</span>}
      </div>

      {/* 名前〜問い ｜ 写真（パンフと同じく写真は右） */}
      <div className={item.photos ? styles.caseHero : styles.caseHeroPlain}>
        <div className={styles.caseHeroText}>
          <h3 className={styles.caseDetailTitle}>{item.title}</h3>
          {item.catchLead && <p className={styles.caseCatchLead}>{item.catchLead}</p>}
          {item.catchCopy && <p className={styles.caseDetailCatch}>{item.catchCopy}</p>}
          {item.meta && <MetaList items={item.meta} />}

          {item.question && (
            <div className={styles.caseQuestionBlock}>
              <p className={styles.questionLabel}>問い</p>
              <p className={styles.caseDetailQuestion}>{item.question}</p>
            </div>
          )}
        </div>

        {item.photos && <Photos photos={item.photos} layout={item.photoLayout} />}
      </div>

      {/* 背景｜ねらい（PCは2列） */}
      <div className={styles.bgAims}>
        {item.background && (
          <div className={styles.block}>
            <Heading>背景</Heading>
            <div className={styles.prose}>
              {item.background.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        )}
        {item.aims && (
          <div className={styles.block}>
            <Heading>ねらい</Heading>
            {item.aimsIntro && <p className={styles.aimsIntro}>{item.aimsIntro}</p>}
            <ul className={item.aimsNumbered ? styles.aimsNumbered : styles.aims}>
              {item.aims.map((a, i) => (
                <li key={a.title}>
                  {item.aimsNumbered && <span className={styles.aimNumber}>{i + 1}</span>}
                  <Marker>{a.title}</Marker>
                  {a.text && <p>{a.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {item.flow && (
        <div className={styles.block}>
          <Heading>内容と流れ</Heading>
          <div className={styles.flow}>
            {item.flow.map((b, i) => (
              <Flow key={i} block={b} />
            ))}
          </div>
        </div>
      )}

      {item.ideas && (
        <div className={styles.block}>
          <Heading>工夫</Heading>
          {item.ideasInline ? (
            <div className={styles.ideasInline}>
              {item.ideas.map((idea) => (
                <p key={idea.title}>
                  <Marker>{idea.title}</Marker>
                  {"　"}
                  {idea.text}
                </p>
              ))}
            </div>
          ) : (
            <ul className={styles.ideasGrid}>
              {item.ideas.map((idea) => (
                <li key={idea.title}>
                  <Marker>{idea.title}</Marker>
                  <p>{idea.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}

/** 「内容と流れ」の中身（パンフの図の形ごと） */
function Flow({ block }: { block: FlowBlock }) {
  switch (block.kind) {
    case "text":
      return <p className={styles.flowText}>{block.text}</p>;

    case "note":
      return <p className={styles.flowNote}>{block.text}</p>;

    case "timeline":
      return (
        <div className={styles.timeline}>
          <div className={styles.timelinePhases}>
            {block.phases.map((p) => (
              <span
                key={p.label}
                className={`${styles.timelinePhase} ${toneClass[p.tone]}`}
                style={{ gridColumn: `span ${p.span}` }}
              >
                {p.label}
              </span>
            ))}
          </div>
          <ol className={styles.timelineSteps}>
            {block.steps.map((s) => (
              <li key={s.when} className={s.strong ? styles.timelineStrong : undefined}>
                <span className={styles.timelineWhen}>{s.when}</span>
                <span className={styles.timelineDot} aria-hidden />
                <span className={styles.timelineLabel}>{s.label}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "numberGrid":
      return (
        <ol className={styles.numberGrid}>
          {block.items.map((it, i) => (
            <li key={it.title}>
              <span className={`${styles.numberCircle} ${toneClass[it.tone]}`}>{i + 1}</span>
              <div>
                <p className={styles.numberTitle}>{it.title}</p>
                <p className={styles.numberText}>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "numberList":
      return (
        <ol className={styles.numberList}>
          {block.items.map((it, i) => (
            <li key={it.title}>
              <span className={`${styles.numberCircle} ${styles.toneAccent}`}>{i + 1}</span>
              <p className={styles.numberListTitle}>{it.title}</p>
              <p className={styles.numberText}>{it.text}</p>
            </li>
          ))}
        </ol>
      );

    case "questions":
      return (
        <div className={styles.questions}>
          <ol className={styles.questionSteps}>
            {block.items.map((q) => (
              <li key={q.step}>
                <span className={styles.questionStep}>
                  {q.step}
                  <span className={styles.questionStepLabel}>{q.label}</span>
                </span>
                <span className={styles.questionText}>{q.question}</span>
              </li>
            ))}
          </ol>
          <p className={styles.flowNote}>{block.note}</p>
        </div>
      );

    case "people":
      return (
        <div className={styles.people}>
          <p className={styles.peopleHeading}>{block.heading}</p>
          <ul className={styles.peopleList}>
            {block.people.map((p) => (
              <li key={p.role}>
                {SHOW_SPEAKER_NAMES && <p className={styles.personName}>{p.name}</p>}
                <p className={styles.personRole}>{p.role}</p>
              </li>
            ))}
          </ul>
        </div>
      );

    case "schedule": {
      const total = block.bar.reduce((sum, b) => sum + b.minutes, 0);
      return (
        <div className={styles.schedule}>
          <div className={styles.scheduleBar}>
            {block.bar.map((b) => (
              <span
                key={b.label}
                className={`${styles.scheduleSeg} ${toneClass[b.tone]}`}
                style={{ flexGrow: b.minutes, flexBasis: `${(b.minutes / total) * 100}%` }}
              >
                {b.label}
              </span>
            ))}
          </div>
          <ul className={styles.scheduleItems}>
            {block.items.map((it) => (
              <li key={it.title}>
                <p className={`${styles.scheduleTitle} ${toneClass[it.tone]}`}>{it.title}</p>
                <p className={styles.numberText}>{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "twoCol":
      return (
        <div className={styles.twoCol}>
          {block.cols.map((col, i) => (
            <FlowColumn key={i} col={col} />
          ))}
        </div>
      );
  }
}

function FlowColumn({ col }: { col: FlowCol }) {
  return (
    <div className={col.boxed ? styles.flowBox : styles.flowCol}>
      {col.heading && (
        <p className={col.boxed ? styles.flowBoxHeading : styles.flowColHeading}>{col.heading}</p>
      )}
      {col.tagged && (
        <dl className={styles.tagged}>
          {col.tagged.map((t) => (
            <div key={t.tag}>
              <dt>{t.tag}</dt>
              <dd>{t.text}</dd>
            </div>
          ))}
        </dl>
      )}
      {col.paras?.map((p) => (
        <p key={p} className={styles.numberText}>
          {p}
        </p>
      ))}
      {col.bullets && (
        <ul className={styles.dotList}>
          {col.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {col.sub?.map((s) => (
        <div key={s.heading} className={styles.flowSub}>
          <p className={styles.flowColHeading}>{s.heading}</p>
          {s.paras?.map((p) => (
            <p key={p} className={styles.numberText}>
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className={styles.dotList}>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────────── 写真（トップの「会社紹介」と同じ：角丸＋少し内側に白い線） ───────────── */

function Photos({
  photos,
  layout = "stack",
}: {
  photos: Photo[];
  layout?: "stack" | "pair" | "row";
}) {
  // pair：問いほぐしのように、1つの枠の中に左右2枚
  if (layout === "pair") {
    return (
      <div className={`${styles.photoFrame} ${styles.photoPair}`}>
        {photos.map((ph) => (
          <div key={typeof ph.src === "string" ? ph.src : ph.src.src} className={styles.photoPairCell}>
            <Image
              src={ph.src}
              alt={ph.alt}
              fill
              sizes="(max-width: 900px) 45vw, 200px"
              className={styles.photo}
              style={ph.position ? { objectPosition: ph.position } : undefined}
            />
          </div>
        ))}
        <div className={styles.photoAccent} aria-hidden />
      </div>
    );
  }

  return (
    <div className={layout === "row" ? styles.photoRow : styles.photoStack}>
      {photos.map((ph) => (
        <div
          key={typeof ph.src === "string" ? ph.src : ph.src.src}
          className={`${styles.photoFrame} ${ph.logo ? styles.photoFrameLogo : ""}`}
        >
          <Image
            src={ph.src}
            alt={ph.alt}
            fill
            sizes="(max-width: 900px) 90vw, 420px"
            className={ph.logo ? styles.photoLogo : styles.photo}
            style={ph.position ? { objectPosition: ph.position } : undefined}
          />
          {!ph.logo && <div className={styles.photoAccent} aria-hidden />}
        </div>
      ))}
    </div>
  );
}

/* ───────────── 03 の事例（短いカード） ───────────── */

function CaseCard({ item, pillarLabel }: { item: Case; pillarLabel?: string }) {
  return (
    <article className={styles.caseCard}>
      {pillarLabel && <CaseKicker pillarLabel={pillarLabel} />}
      {item.target && <span className={styles.caseTarget}>{item.target}</span>}
      <h4 className={styles.caseTitle}>{item.title}</h4>
      {item.catchCopy && <p className={styles.caseCatch}>{item.catchCopy}</p>}
      {item.meta && <MetaList items={item.meta} />}
      {item.subline && <p className={styles.caseSubline}>{item.subline}</p>}
      {item.question && (
        <p className={styles.caseQuestion}>
          <span className={styles.questionLabel}>問い</span>
          {item.question}
        </p>
      )}
      {item.body?.map((t) => (
        <p key={t} className={styles.caseBody}>
          {t}
        </p>
      ))}
      {item.points && (
        <ul className={styles.pointList}>
          {item.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {item.photos && <Photos photos={item.photos} layout="row" />}
    </article>
  );
}

/* ───────────── 04 トリノメ（p.12・13） ───────────── */

function Torinome({ cases }: { cases?: ReactNode }) {
  return (
    <div className={styles.torinome}>
      {/* p.12 上：名前・概要・問い ｜ 図1 */}
      <div className={styles.torinomeTop}>
        <div className={styles.torinomeMain}>
          <div className={styles.torinomeHead}>
            {/* パンフと同じく、名前の左にロゴ */}
            <div className={styles.torinomeNameRow}>
              <Image
                src={torinomeLogo}
                alt="トリノメのロゴ"
                className={styles.torinomeLogo}
                unoptimized
              />
              <div className={styles.torinomeName}>
                <p className={styles.torinomeKicker}>自己探求AI</p>
                <h3 className={styles.torinomeTitle}>
                  「トリノメ」<span className={styles.torinomeSub}>（問いほぐしAI）</span>
                </h3>
              </div>
            </div>
            <p className={styles.torinomeCatch}>AIが答えを出す時代に、自分だけの種火を描く。</p>
          </div>
          <MetaList items={torinome.meta} />
          <p className={styles.questionLabel}>問い</p>
          <BigQuestion lines={["あなたが、", "心からやりたいことは何ですか？"]} />
        </div>

        {/* 図1「問いほぐしの層」 */}
        <figure className={styles.layers}>
          <div className={styles.layerOuter}>
            {/* まわりから問いが入ってくる矢印（パンフの図1と同じ） */}
            <span className={`${styles.layerQ} ${styles.layerQTop}`} aria-hidden>
              ?
            </span>
            <span className={`${styles.layerQ} ${styles.layerQLeft}`} aria-hidden>
              ?→
            </span>
            <span className={`${styles.layerQ} ${styles.layerQRight}`} aria-hidden>
              ←?
            </span>
            <span className={`${styles.layerQ} ${styles.layerQBottom}`} aria-hidden>
              ?↗
            </span>
            <span className={styles.layerOuterLabel}>どこかで聞いた言葉</span>
            <div className={styles.layerMiddle}>
              <span className={styles.layerMiddleLabel}>言いかけていること</span>
              <div className={styles.layerCore}>核</div>
            </div>
          </div>
          <figcaption className={styles.layersCaption}>
            <span className={styles.layersCore}>核</span>：まだ言葉になっていない大切な価値観
            <br />
            図1　問いほぐしの層
          </figcaption>
        </figure>
      </div>

      {/* p.12 下：問いほぐしとは */}
      <div className={styles.block}>
        <Heading>問いほぐしとは</Heading>
        <div className={styles.longText}>
          {torinome.toihogushi.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p>
            <strong>{torinome.toihogushiLast}</strong>
          </p>
        </div>
        <p className={styles.source}>{torinome.source}</p>
      </div>

      {/* 図2「答えを渡すAI／問いを返すAI」 */}
      <figure className={styles.compare}>
        <figcaption className={styles.compareCaption}>図2　答えを渡すAI／問いを返すAI</figcaption>
        <div className={styles.compareRow}>
          <span className={styles.compareFrom}>生徒の相談</span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareMid}>一般的な生成AI：候補を並べる</span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareTo}>「AIが出した答え」</span>
        </div>
        <div className={`${styles.compareRow} ${styles.compareRowAccent}`}>
          <span className={styles.compareFrom}>生徒の相談</span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareMid}>トリノメ：問いを返す</span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareTo}>「あなたの答え」</span>
        </div>
      </figure>

      {/* p.13：背景 */}
      <div className={styles.block}>
        <Heading>背景</Heading>
        <div className={styles.longText}>
          {torinome.background.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>

      {/* 背景の最後（大和中での実証）につなげて、事例のカード */}
      {cases}

      {/* 図3 対話イメージ ｜ ねらい */}
      <div className={styles.bgAims}>
        <figure className={styles.chat}>
          <figcaption className={styles.chatLabel}>図3　対話イメージ</figcaption>
          <ul className={styles.chatList}>
            {torinome.chat.map((m, i) => (
              <li
                key={i}
                className={`${m.from === "ai" ? styles.chatAi : styles.chatMe} ${
                  m.highlight ? styles.chatHighlight : ""
                }`}
              >
                {m.from === "ai" && <span className={styles.chatName}>トリノメ：</span>}
                {m.text}
              </li>
            ))}
          </ul>
          <p className={styles.chatCaption}>{torinome.chatCaption}</p>
        </figure>

        <div className={styles.block}>
          <Heading>ねらい</Heading>
          <ul className={styles.aims}>
            {torinome.aims.map((a, i) => (
              <li key={a.title}>
                <Marker>{a.title}</Marker>
                <p>{a.text}</p>
                {/* 「価値観に輪郭をつける」の下に、感情 → 価値観 → 願い の図 */}
                {i === 1 && (
                  <ol className={styles.wish}>
                    {torinome.layersOfWish.map((w) => (
                      <li key={w.label}>
                        <span className={`${styles.wishCircle} ${toneClass[w.tone]}`}>{w.label}</span>
                        <span className={styles.wishNote}>{w.note}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 内容と流れ（ねらい／方策の表） */}
      <div className={styles.block}>
        <Heading>内容と流れ</Heading>
        <div className={styles.stepTable} role="table">
          <div className={styles.stepTableHead} role="row">
            <span role="columnheader" />
            <span role="columnheader">ねらい</span>
            <span role="columnheader">方策</span>
          </div>
          {torinome.steps.map((s) => (
            <div key={s.title} className={styles.stepTableRow} role="row">
              <span role="rowheader" className={styles.stepTitle}>
                {s.title}
              </span>
              <span role="cell">
                <span className={styles.stepCellLabel}>ねらい</span>
                {s.aim}
              </span>
              <span role="cell">
                <span className={styles.stepCellLabel}>方策</span>
                {s.how}
              </span>
            </div>
          ))}
        </div>

        {/* 図5 問いほぐしの循環 */}
        <figure className={styles.cycle}>
          <p className={styles.cycleLine}>
            {torinome.cycle.map((c, i) => (
              <span key={c} className={i === torinome.cycle.length - 1 ? styles.cycleLast : undefined}>
                {c}
                {i < torinome.cycle.length - 1 ? (
                  <span className={styles.cycleArrow} aria-hidden>
                    →
                  </span>
                ) : (
                  <span className={styles.cycleArrow} aria-hidden>
                    ↺
                  </span>
                )}
              </span>
            ))}
          </p>
          <figcaption className={styles.cycleCaption}>図5　{torinome.cycleCaption}</figcaption>
        </figure>

        {/* 使う場面と、変容のイメージ */}
        <p className={styles.scenesLead}>{torinome.scenesLead}</p>
        <table className={styles.scenes}>
          <thead>
            <tr>
              <th scope="col">場面</th>
              <th scope="col">はじめ</th>
              <th scope="col">問いほぐしのあと</th>
            </tr>
          </thead>
          <tbody>
            {torinome.scenes.map((s) => (
              <tr key={s.scene}>
                <th scope="row">{s.scene}</th>
                <td>{s.before}</td>
                <td>{s.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 事例の詳しいページの中身：01・02 の事例は詳しい形、03 の短い事例はカードの形 */
export function CaseView({ item, pillarLabel }: { item: Case; pillarLabel: string }) {
  return (
    <section className={styles.section} aria-label={item.title}>
      {item.background ? (
        <CaseDetail item={item} pillarLabel={pillarLabel} />
      ) : (
        <CaseCard item={item} pillarLabel={pillarLabel} />
      )}
    </section>
  );
}

/* MicroCMS で足した事例の詳しいページの中身。
   上半分は 01・02 の事例と同じ型（右上にタグ・大きなタイトル・キャッチ・概要の表・問い｜写真は右に縦）、
   下は本文（リッチエディタの HTML：見出し2＝「背景」と同じ赤い見出し、見出し3＝紺の小見出し、箇条書き＝赤い点、太字＝黄色のマーカー）。
   キャッチ・概要・問い・写真は、空なら出さない */
export function CmsCaseView({
  pillarLabel,
  title,
  tag,
  catchCopy,
  subline,
  meta,
  question,
  body,
  photos,
}: {
  /** 「01 教材・カリキュラム開発」（MicroCMS の「事業の種類」の番号から） */
  pillarLabel: string;
  title: string;
  tag?: string;
  catchCopy?: string;
  subline?: string;
  /** 「主催：〇〇」を1行ずつ */
  meta?: string;
  question?: string;
  body?: string;
  photos?: { url: string }[];
}) {
  const metaItems = (meta ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(/^(.+?)[：:]\s*(.*)$/);
      return m ? { label: m[1].trim(), value: m[2].trim() } : { label: "", value: line };
    });
  // 写真：2枚まではタイトルの右に縦に、3枚目からは本文の下に横に並べる
  const toPhoto = (ph: { url: string }, i: number): Photo => ({
    src: ph.url,
    alt: `${title}の写真${(photos?.length ?? 0) > 1 ? ` ${i + 1}` : ""}`,
  });
  const allPhotos = (photos ?? []).map(toPhoto);
  const heroPhotos = allPhotos.slice(0, 2);
  const restPhotos = allPhotos.slice(2);

  return (
    <section className={styles.section} aria-label={title}>
      <article className={styles.caseDetail}>
        <div className={styles.caseDetailTop}>
          <CaseKicker pillarLabel={pillarLabel} />
          {tag && <span className={styles.caseTargetPill}>{tag}</span>}
        </div>

        <div className={heroPhotos.length > 0 ? styles.caseHero : styles.caseHeroPlain}>
          <div className={styles.caseHeroText}>
            <h3 className={styles.caseDetailTitle}>{title}</h3>
            {catchCopy && <p className={styles.caseDetailCatch}>{catchCopy}</p>}
            {subline && <p className={styles.caseSubline}>{subline}</p>}
            {metaItems.length > 0 && <MetaList items={metaItems} />}
            {question && (
              <div className={styles.caseQuestionBlock}>
                <p className={styles.questionLabel}>問い</p>
                <p className={styles.caseDetailQuestion}>{question}</p>
              </div>
            )}
          </div>
          {heroPhotos.length > 0 && <Photos photos={heroPhotos} />}
        </div>

        {body && (
          <div className={styles.richBody} dangerouslySetInnerHTML={{ __html: body }} />
        )}
        {restPhotos.length > 0 && <Photos photos={restPhotos} layout="row" />}
      </article>
    </section>
  );
}

/* プロダクトのページの中身（今はトリノメだけ）。cases は「背景」の後に出す事例のカード */
export function ProductView({ cases }: { cases?: ReactNode }) {
  return (
    <section className={styles.section} aria-label="自己探求AI トリノメ">
      <Torinome cases={cases} />
    </section>
  );
}
