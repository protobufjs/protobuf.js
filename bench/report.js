"use strict";

var fs   = require("fs"),
    path = require("path");

var beginMarker = "<!-- BEGIN BENCHMARK DATA -->",
    endMarker   = "<!-- END BENCHMARK DATA -->",
    resultsFile = path.join(__dirname, "results", "latest.json"),
    resultsDir  = path.join(__dirname, "results"),
    readmeFile  = path.join(__dirname, "..", "README.md");

var themes = {
    light: {
        text: "#1f2933",
        meta: "#65758b",
        value: "#4a5568",
        axis: "#d8dee9",
        grid: "#eef2f7",
        palette: [ "#0072ce", "#60a5fa", "#7c3aed", "#f59e0b", "#ef4444" ]
    },
    dark: {
        text: "#f0f6fc",
        meta: "#8b949e",
        value: "#c9d1d9",
        axis: "#484f58",
        grid: "#30363d",
        palette: [ "#1f6feb", "#79c0ff", "#a371f7", "#d29922", "#f85149" ]
    }
};

var series = [
    { name: "protobuf.js static", color: 0, legendWidth: 140 },
    { name: "protobuf.js reflect", color: 1, legendWidth: 140 },
    { name: "JSON", color: 2, legendWidth: 80 },
    { name: "protoc-gen-js", color: 3, legendWidth: 120 },
    { name: "protoc-gen-es", color: 4, legendWidth: 120 }
];

if (require.main === module) {
    var result = JSON.parse(fs.readFileSync(resultsFile, "utf8"));
    render(result);
    updateReadme(result);
}

function render(result) {
    fs.mkdirSync(resultsDir, { recursive: true });
    result.operations.forEach(function(operation) {
        Object.keys(themes).forEach(function(themeName) {
            var file = path.join(resultsDir, operation.name + "-" + themeName + ".svg");
            fs.writeFileSync(file, renderOperation(result, operation, themes[themeName]));
            process.stdout.write("wrote " + file.replace(/\\/g, "/") + "\n");
        });
        var file = path.join(resultsDir, operation.name + ".svg");
        fs.writeFileSync(file, renderOperation(result, operation, themes.light, "#ffffff"));
        process.stdout.write("wrote " + file.replace(/\\/g, "/") + "\n");
    });
}

function renderOperation(result, operation, theme, background) {
    var width = 840,
        margin = { top: 100, right: 12, bottom: 72, left: 12 },
        chartHeight = 190,
        caseGap = 12,
        height = margin.top + chartHeight + margin.bottom;

    var orderedSeries = getOperationSeries(operation),
        caseWidth = (width - margin.left - margin.right - caseGap * (operation.cases.length - 1)) / operation.cases.length,
        barGap = 8,
        pairedBarGap = 2,
        barWidth = Math.min(30, Math.floor((caseWidth - 20 - barGap * (orderedSeries.length - 2) - pairedBarGap) / orderedSeries.length)),
        barGroupWidth = orderedSeries.length * barWidth + barGap * (orderedSeries.length - 2) + pairedBarGap,
        chartTop = margin.top,
        chartBottom = margin.top + chartHeight;

    var out = [];
    out.push("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + height + "\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-labelledby=\"title desc\">");
    out.push("<title id=\"title\">protobuf.js " + escapeXml(operation.title) + " benchmark</title>");
    out.push("<desc id=\"desc\">Normalized benchmark throughput by case. The fastest implementation in each case is 100%.</desc>");
    out.push("<style>");
    out.push("text{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;fill:" + theme.text + "}");
    out.push(".title{font-size:22px;font-weight:700}.meta,.legend{font-size:12px;fill:" + theme.meta + "}.case{font-size:15px;font-weight:700}.value{font-size:10px;fill:" + theme.value + "}.axis{stroke:" + theme.axis + ";stroke-width:1}.grid{stroke:" + theme.grid + ";stroke-width:1}.bar{rx:3;ry:3}");
    out.push("</style>");
    if (background)
        out.push("<rect width=\"100%\" height=\"100%\" fill=\"" + background + "\"/>");
    out.push("<text x=\"" + margin.left + "\" y=\"30\" class=\"title\">" + escapeXml(titleCase(operation.title)) + " Throughput</text>");
    out.push("<text x=\"" + margin.left + "\" y=\"50\" class=\"meta\">Normalized ops/s; fastest = 100%. " + escapeXml(systemLabel(result)) + ".</text>");

    operation.cases.forEach(function(benchCase, caseIndex) {
        var variants = indexVariants(benchCase.variants),
            caseX = margin.left + caseIndex * (caseWidth + caseGap),
            caseCenter = caseX + caseWidth / 2,
            barsX = caseX + (caseWidth - barGroupWidth) / 2;

        out.push("<text x=\"" + caseCenter + "\" y=\"" + (chartTop - 12) + "\" text-anchor=\"middle\" class=\"case\">" + escapeXml(benchCase.title) + "</text>");
        [0, 0.5, 1].forEach(function(tick) {
            var y = chartBottom - chartHeight * tick;
            out.push("<line x1=\"" + caseX + "\" y1=\"" + y + "\" x2=\"" + (caseX + caseWidth) + "\" y2=\"" + y + "\" class=\"" + (tick ? "grid" : "axis") + "\"/>");
        });

        sortSeriesByCase(orderedSeries, variants).forEach(function(item, barIndex) {
            var variant = variants[item.name];
            var barX = barsX + barOffset(barIndex, barWidth, barGap, pairedBarGap),
                barHeight = Math.max(1, Math.round(chartHeight * variant.relative)),
                barY = chartBottom - barHeight;
            out.push("<rect x=\"" + barX + "\" y=\"" + barY + "\" width=\"" + barWidth + "\" height=\"" + barHeight + "\" class=\"bar\" fill=\"" + theme.palette[item.color] + "\"/>");
            out.push("<text x=\"" + (barX + barWidth / 2) + "\" y=\"" + (chartBottom + 17) + "\" text-anchor=\"middle\" class=\"value\">" + escapeXml(formatHz(variant.hz)) + "</text>");
        });
    });
    renderLegend(out, orderedSeries, theme, margin.left, height - 24, width - margin.left - margin.right);

    out.push("</svg>");
    return out.join("\n") + "\n";
}

function updateReadme(result) {
    var markdown = fs.readFileSync(readmeFile, "utf8"),
        begin = markdown.indexOf(beginMarker),
        end = markdown.indexOf(endMarker);

    if (begin < 0 || end < 0 || end < begin)
        throw Error("README benchmark markers missing or out of order");

    markdown = markdown.substring(0, begin + beginMarker.length)
        + "\n\n" + renderBenchmarkData(result)
        + "\n\n" + markdown.substring(end);

    fs.writeFileSync(readmeFile, markdown);
    process.stdout.write("updated " + path.relative(path.join(__dirname, ".."), readmeFile).replace(/\\/g, "/") + "\n");
}

function renderBenchmarkData(result) {
    return result.operations.map(function(operation) {
        var title = titleCase(operation.title) + " Throughput";
        return "<picture>\n"
            + "  <source media=\"(prefers-color-scheme: dark)\" srcset=\"./bench/results/" + operation.name + "-dark.svg\">\n"
            + "  <source media=\"(prefers-color-scheme: light)\" srcset=\"./bench/results/" + operation.name + "-light.svg\">\n"
            + "  <img alt=\"" + title + "\" src=\"./bench/results/" + operation.name + ".svg\">\n"
            + "</picture>\n\n"
            + "<details>\n"
            + "<summary>Show table</summary>\n\n"
            + renderTable(operation) + "\n\n"
            + "</details>";
    }).join("\n\n");
}

function renderTable(operation) {
    var variants = getOperationSeries(operation).map(function(item) {
            return item.name;
        }),
        rows = [
            "| Implementation | " + operation.cases.map(function(benchCase) { return benchCase.title; }).join(" | ") + " |",
            "| --- | " + operation.cases.map(function() { return "---:"; }).join(" | ") + " |"
        ];

    var cases = operation.cases.map(function(benchCase) {
        return {
            byName: indexVariants(benchCase.variants),
            fastestHz: Math.max.apply(Math, benchCase.variants.map(function(variant) {
                return variant.hz;
            }))
        };
    });

    variants.forEach(function(name) {
        rows.push("| " + name + " | " + cases.map(function(benchCase) {
            var variant = benchCase.byName[name];
            return variant ? formatThroughput(variant.hz, benchCase.fastestHz) : "";
        }).join(" | ") + " |");
    });

    return rows.join("\n");
}

function renderLegend(out, orderedSeries, theme, x, y, width) {
    var totalWidth = orderedSeries.reduce(function(sum, item) {
        return sum + item.legendWidth;
    }, 0);
    x += Math.max(0, (width - totalWidth) / 2);
    orderedSeries.forEach(function(item) {
        var slotX = x;
        out.push("<rect x=\"" + slotX + "\" y=\"" + (y - 10) + "\" width=\"11\" height=\"11\" rx=\"2\" ry=\"2\" fill=\"" + theme.palette[item.color] + "\"/>");
        out.push("<text x=\"" + (slotX + 16) + "\" y=\"" + y + "\" class=\"legend\">" + escapeXml(item.name) + "</text>");
        x += item.legendWidth;
    });
}

function getOperationSeries(operation) {
    var present = {};
    operation.cases.forEach(function(benchCase) {
        benchCase.variants.forEach(function(variant) {
            present[variant.name] = true;
        });
    });
    return series.filter(function(item) {
        return present[item.name];
    });
}

function sortSeriesByCase(orderedSeries, variants) {
    var protobuf = orderedSeries.filter(function(item) {
            return /^protobuf\.js /.test(item.name) && variants[item.name];
        }),
        others = orderedSeries.filter(function(item) {
            return !/^protobuf\.js /.test(item.name) && variants[item.name];
        });
    return protobuf.concat(others.sort(function(a, b) {
        return variants[b.name].hz - variants[a.name].hz;
    }));
}

function barOffset(index, width, gap, pairedGap) {
    if (index === 0)
        return 0;
    return index * width + pairedGap + (index - 1) * gap;
}

function indexVariants(variants) {
    var byName = {};
    variants.forEach(function(variant) {
        byName[variant.name] = variant;
    });
    return byName;
}

function formatHz(value) {
    if (value >= 100000000)
        return (value / 1000000).toFixed(0) + "M";
    if (value >= 10000000)
        return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000000)
        return (value / 1000000).toFixed(2) + "M";
    if (value >= 100000)
        return (value / 1000).toFixed(0) + "K";
    if (value >= 10000)
        return (value / 1000).toFixed(1) + "K";
    if (value >= 1000)
        return (value / 1000).toFixed(2) + "K";
    return value.toFixed(0);
}

function formatThroughput(value, fastest) {
    var throughput = formatHz(value) + " ops/s";
    return (value === fastest
        ? "**" + throughput + "**"
        : throughput) + " &nbsp; <small>" + (fastest / value).toFixed(1) + "x</small>";
}

function systemLabel(result) {
    var parts = ["Node " + result.node];
    if (result.cpu)
        parts.push(result.cpu);
    return parts.join(" \u00b7 ");
}

function titleCase(value) {
    return value.replace(/(^|-)([a-z])/g, function(_, sep, ch) {
        return (sep ? " " : "") + ch.toUpperCase();
    });
}

function escapeXml(value) {
    return String(value).replace(/[&<>"]/g, function(ch) {
        return ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : "&quot;";
    });
}
