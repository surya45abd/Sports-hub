# Tournament history data

Each tournament has its own JSON file under a sport folder. `manifest.json` maps each listed tournament to its file.

`records` contains results checked against sources. A record uses `year`, `winner`, `runnerUp`, `score`, and `margin`. Leave fields empty when the cited source does not report them. Set `verificationStatus` to `partial` when only some editions have been checked; the dialog labels these results as partial. Use `verified` only when the full archive has been reviewed. The `source.url` and any `verificationSources` together must support every record. Add independent cross-check links under `verificationSources`; the results dialog displays them with the archive link. Use `reviewNotes` to document conflicts or corrections found during verification.

`candidateRecords` preserves the current bundled rows for comparison during source review. The results dialog may show them under a clear unverified warning so the archive is not blank, but they are not source-verified history. Do not copy them into `records` or label them verified without checking the cited source.

`source.url` should point to the official organizer's historical results page when one exists. Record `verificationStatus` is `needs-history-research` or `needs-source-review` until the archive has been checked.

Fetch each file from its own `source.url`, check every edition against that tournament's archive, and only then add it to `records` and set `verificationStatus` to `verified`. Do not use a generic search result as the source for another tournament.
