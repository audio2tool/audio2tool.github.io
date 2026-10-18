# Audio2Tool: Speak, Call, Act — A Dataset for Benchmarking Speech Tool Use

Project page for the **Audio2Tool** benchmark, showcasing the eight complexity tiers with audio samples, transcripts, and ground-truth tool calls.

Audio2Tool evaluates speech function calling across smart car, smart home, and wearable APIs. The paper was published in **Interspeech 2026, pp. 3453–3457**, DOI **[10.21437/Interspeech.2026-2857](https://doi.org/10.21437/Interspeech.2026-2857)**. Use [public/citation.bib](public/citation.bib) or the preferred paper citation in [CITATION.cff](CITATION.cff).

## Links

- **Paper:** [Official Interspeech proceedings](https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.html)
- **Preprint:** [arXiv:2604.22821](https://arxiv.org/abs/2604.22821)
- **Dataset:** [RVtech/Audio2Tool on Hugging Face](https://huggingface.co/datasets/RVtech/Audio2Tool)
- **Code:** [audio2tool/Audio2Tool on GitHub](https://github.com/audio2tool/Audio2Tool)
- **Leaderboard:** [RVtech/Audio2ToolLeaderboard on Hugging Face Spaces](https://huggingface.co/spaces/RVtech/Audio2ToolLeaderboard)

All external links are defined in the `LINKS` object near the top of `src/App.tsx`; a `null` entry renders as a disabled "Soon" placeholder.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Search and research discovery

`npm run build` compiles the client and renders the same React page into `dist/index.html`. The title, abstract, resource links, benchmark scope, all eight tier descriptions, and citation are available without JavaScript. The browser hydrates this HTML to enable the audio demo. `npm run dev` remains client-rendered; use `npm run build && npm run preview` to inspect the production HTML.

The homepage includes a canonical URL, Google Scholar citation metadata, and ordinary `ScholarlyArticle` JSON-LD. Keep these synchronized with the official proceedings record. The PDF is linked normally to ISCA; an external `citation_pdf_url` is intentionally omitted because [Scholar's guidelines](https://scholar.google.com/intl/en/scholar/inclusion.html) require that field's PDF to be in the same subdirectory as the abstract page. ISCA and arXiv remain the hosted full-text records.

`public/robots.txt` allows crawlers and declares `public/sitemap.xml`. A missing robots file previously did not block crawling. No new training-specific permission or restriction is introduced. Sitemap submission and metadata help discovery but do not guarantee indexing, ranking, AI retrieval, or citations; no special AI file or schema is required by [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

After deployment:

1. Verify the site in Google Search Console and Bing Webmaster Tools, submit `https://audio2tool.github.io/sitemap.xml`, and inspect/request indexing of the homepage. Search Console verification tokens must come from the site owner; this repository contains no invented token.
2. Update the **code repository** README/CITATION.cff and the **Hugging Face dataset card** to use the same official paper title, DOI, authors, and BibTeX. Link the proceedings, preprint, project, code, and dataset to each other.
3. Reconcile the paper/site's approximately 30,000-query benchmark with the dataset card's public-release counts. Define unique queries, audio renditions, and rows separately and fix the Hugging Face viewer's size-consistency error before publishing new exact totals.
4. Link the official publication from each author's publications page. Add factual comparisons and reproducible usage instructions where they help researchers assess relevance.
5. Track Search Console impressions/clicks for relevant non-branded queries such as “speech function calling benchmark” and “audio-native tool use”. Periodically test neutral literature-search prompts in research assistants, recording whether the paper is retrieved, linked, and summarized correctly. Treat these as observations; assistant results vary.

## Hosting on GitHub Pages

1. **Create a new repository** (e.g. `audio2tool-demo`) on GitHub.

2. **Copy this folder** into the new repo (or clone the new repo and copy these files into it).

3. **Add real audio and metadata**  
   Place your `.wav` files in `public/audio/tier1/` … `public/audio/tier8/` and update each tier's `metadata.json` to match your samples (see structure below).

4. **Build for GitHub Pages**  
   This site uses `/` at `audio2tool.github.io`. If adapting it to a project subdirectory, set the base in `vite.config.ts` so both the client and prerender builds share it:

   ```ts
   base: '/your-repo-name/',
   ```

   Then run `npm install` and `npm run build`. Also update canonical URLs, the sitemap, and research metadata for the new site.

5. **Deploy**  
   - Enable GitHub Pages in the repo (Settings → Pages).  
   - Source: **GitHub Actions** (recommended) or **Deploy from branch** (e.g. `gh-pages` with the contents of `dist/`).  
   - If using "Deploy from branch", push the built `dist/` contents to the chosen branch.

## Results & Figures

The **Results & Figures** tab shows interactive figures from the paper (e.g. query distributions, domain breakdowns). To add your own graphs:

1. Put image files (PNG, JPG, SVG) in **`public/figures/`**.
2. Edit **`public/figures/figures.json`** and add an entry per figure:
   ```json
   {
     "id": "fig1",
     "file": "your-chart.png",
     "title": "Short title",
     "caption": "Optional caption shown below the figure."
   }
   ```

Figures appear in a grid; clicking one opens a lightbox. Order in the list is the display order.

## Taxonomy diagram

The **Taxonomy** tab shows a static diagram (`public/taxonomy.svg`) of domains and categories. The CSV is not in the repo. To regenerate the diagram from your own CSV:

```bash
node scripts/generate-taxonomy-diagram.js path/to/taxonomy_tools_4.fixed.csv
```

This overwrites `public/taxonomy.svg`. Commit the new SVG if desired.

## Metadata format

Each tier folder (`public/audio/tier1/` … `tier8/`) should contain:

- **metadata.json** — tier info and list of samples (see below).
- **.wav files** — referenced by `audio_file` in each sample.

Example **metadata.json**:

```json
{
  "tier_info": {
    "tier_number": 3,
    "name": "Multi-Intent",
    "description": "Single utterances expressing multiple intents."
  },
  "samples": [
    {
      "audio_file": "sample_3_001.wav",
      "transcript": "Defrost the windshield and find a charger.",
      "ground_truth": {
        "tool_calls": [
          { "tool": "defrost_windshield", "parameters": {} },
          { "tool": "find_charging_station", "parameters": {} }
        ]
      },
      "reasoning": "Two distinct actions connected by 'and'."
    }
  ]
}
```

Add as many entries to `samples` as you have; the demo will pick one at random when you click "Randomize".

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- wavesurfer.js (waveform)
- lucide-react (icons)

## License

Same as the Audio2Tool paper/repository.
