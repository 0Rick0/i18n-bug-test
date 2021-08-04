# Vue-I18n memory leak
This repository is to demonstrate the memory leak described in [kazupon/vue-i18n#1225](https://github.com/kazupon/vue-i18n/issues/1225).

When Vue-I18n is used in a SSR context, not all lifecycles are called.
A previous optimization in [kazupon/vue-i18n#572](https://github.com/kazupon/vue-i18n/pull/572) improved SSR compatibility quite a bit.

Since the components in this repository are not that complex, the node process won't crash.
But in a production environment with a more complex project this did happen.

## Requirements
The [`siege`](https://www.joedog.org/siege-home/) program is used to simulate heavy traffic. It can be installed on MacOS (Homebrew) or Linux (package manager).

The bug has been reproduced on Linux using node v12.22.4. The bug should be independent of node versions.

## Running
To run this test, first run `yarn install` (or npm, if you prefer).
Then the server can be started in analysis mode (with heapsnapshot-signal) using `yarn run inspect`.

Once the server is running, a second terminal can be used to start the `siege.sh` script.
This script will send a high load to the server.

Leave it running for a couple of minutes to let the heap build up.

Take a heap snapshot using `kill -USR2 [PID of node process here]`.
Writing the snapshot takes a minute or two. In this time the process in unresponsive to other requests.

Once done, you can open the snapshot in the memory profiler of Chrome.

## Findings
In testing, I noticed that there were a lot of `Watcher` objects, which where pointing to the `$data` of the VueI18n instance.

Patching the VueI18n instance to only create the watcher once mitigated this heap growth.

## Hypernova
[Hypernova](https://github.com/airbnb/hypernova) is a SSR framework initially designed for React as the fronten framework with Ruby in the backend.
It has since been expanded with different hypernova "clients", which connect to the hypernova server, and different component renderers, including Vue.

It has been used in this example as it was the SSR framework I was most familiar with.
