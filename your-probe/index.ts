import fetch from "node-fetch"
import { MeterProvider, MetricReader, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { GetLastBlock, NodeBody } from "./src/client";


const start = async () => {

    setInterval(async () => {
        let data = await GetLastBlock();
        console.log(data);
        // To-Do
        // send metric to OLTP standard

        const exporter = new OTLPMetricExporter();
        const meterProvider = new MeterProvider({
            exporter,
            interval: 1000,
          });
        const meter = meterProvider.getMeter('eth-node-last-block-meter');
        const counter = meter.createCounter('last-block');
        counter.add(1, { 'last-block-meter': data });
        exporter.export();
    }, 5000);
};

start();
