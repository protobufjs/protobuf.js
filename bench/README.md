# Benchmark

```sh
npm install
npm run bench
npm run render
```

`npm run bench` runs all cases and writes `results/latest.json`.
`npm run render` updates the SVG charts and README tables from that file.

To regenerate the benchmark fixtures:

```sh
npm run generate
```

This requires `protoc` on `PATH` for libraries that can only generate code through a protoc plugin.
