# \[GitHub Action\] Send To Pipedream

<details>
  <summary><a href="https://github.com/hugoalh/GitHubAction.SendToPipedream"><code>hugoalh/GitHubAction.SendToPipedream</code></a></summary>
  <img align="center" alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/hugoalh/GitHubAction.SendToPipedream?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Top Langauge" src="https://img.shields.io/github/languages/top/hugoalh/GitHubAction.SendToPipedream?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Repo Size" src="https://img.shields.io/github/repo-size/hugoalh/GitHubAction.SendToPipedream?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Code Size" src="https://img.shields.io/github/languages/code-size/hugoalh/GitHubAction.SendToPipedream?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Watcher" src="https://img.shields.io/github/watchers/hugoalh/GitHubAction.SendToPipedream?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Star" src="https://img.shields.io/github/stars/hugoalh/GitHubAction.SendToPipedream?logo=github&logoColor=ffffff&style=flat-square" />
  <img align="center" alt="GitHub Fork" src="https://img.shields.io/github/forks/hugoalh/GitHubAction.SendToPipedream?logo=github&logoColor=ffffff&style=flat-square" />
</details>

A GitHub action to send data to Pipedream via SDK.

<table>
  <tr>
    <td><a href="./LICENSE.md"><b>License</b></a></td>
    <td>MIT</td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToPipedream/releases"><b>Release</b></a> <img align="center" src="https://img.shields.io/github/downloads/hugoalh/GitHubAction.SendToPipedream/total?label=%20&style=flat-square" /></td>
    <td>
      <b>Latest:</b> <img align="center" src="https://img.shields.io/github/release/hugoalh/GitHubAction.SendToPipedream?sort=semver&label=%20&style=flat-square" /> (<img align="center" src="https://img.shields.io/github/release-date/hugoalh/GitHubAction.SendToPipedream?label=%20&style=flat-square" />)<br />
      <b>Pre:</b> <img align="center" src="https://img.shields.io/github/release/hugoalh/GitHubAction.SendToPipedream?include_prereleases&sort=semver&label=%20&style=flat-square" /> (<img align="center" src="https://img.shields.io/github/release-date-pre/hugoalh/GitHubAction.SendToPipedream?label=%20&style=flat-square" />)
    </td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToPipedream/graphs/contributors"><b>Contributor</b></a> <img align="center" src="https://img.shields.io/github/contributors/hugoalh/GitHubAction.SendToPipedream?label=%20&style=flat-square" /></td>
    <td><ul>
        <li><a href="https://github.com/hugoalh">hugoalh</a></li>
        <li><a href="https://github.com/hugoalh-studio">hugoalh Studio</a></li>
    </ul></td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToPipedream/issues?q=is%3Aissue"><b>Issue</b></a></td>
    <td><img align="center" src="https://img.shields.io/github/issues-raw/hugoalh/GitHubAction.SendToPipedream?label=%20&style=flat-square" /> : <img align="center" src="https://img.shields.io/github/issues-closed-raw/hugoalh/GitHubAction.SendToPipedream?label=%20&style=flat-square" /></td>
  </tr>
  <tr>
    <td><a href="https://github.com/hugoalh/GitHubAction.SendToPipedream/pulls?q=is%3Apr"><b>Pull Request</b></a></td>
    <td><img align="center" src="https://img.shields.io/github/issues-pr-raw/hugoalh/GitHubAction.SendToPipedream?label=%20&style=flat-square" /> : <img align="center" src="https://img.shields.io/github/issues-pr-closed-raw/hugoalh/GitHubAction.SendToPipedream?label=%20&style=flat-square" /></td>
  </tr>
  <tr>
    <td><b>Code Quality</b></td>
    <td>
      <a href="https://www.codefactor.io/repository/github/hugoalh/githubaction.sendtopipedream"><img align="center" alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/hugoalh/GitHubAction.SendToPipedream?logo=codefactor&logoColor=ffffff&style=flat-square" /></a>
      <a href="https://lgtm.com/projects/g/hugoalh/GitHubAction.SendToPipedream/alerts"><img align="center" alt="LGTM Alert" src="https://img.shields.io/lgtm/alerts/g/hugoalh/GitHubAction.SendToPipedream?label=%20&logo=lgtm&logoColor=ffffff&style=flat-square" /></a>
      <a href="https://lgtm.com/projects/g/hugoalh/GitHubAction.SendToPipedream/context:javascript"><img align="center" alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/g/hugoalh/GitHubAction.SendToPipedream?logo=lgtm&logoColor=ffffff&style=flat-square" /></a>
    </td>
  </tr>
</table>

## 📜 Description

### 🌟 Feature

- Simple setup.
- Support variable to create dynamic/rich content.

## 🛠 Configuration

### 🏗 Environment

#### Operating System

Any

#### Software

- NodeJS (>= v12.13)
- NPM (>= v6.12)

### 📥 Input

| **Legend** | **Description** |
|:---:|:----|
| \[V\] | Support variable. |

To use variable in the supported argument, follow the pattern:

| **Category** | **Workflow File (Parse Via GitHub Machine/Runner)** | **Workflow File (Parse Via Action)** |
|:---:|:---:|:---:|
| External | *(N/A)* | `"<variable_prefix>external<variable_join><namespace><variable_suffix>"` |
| GitHub Event Webhook Payload | `"${{github.event.<namespace>}}"` | `"<variable_prefix>payload<variable_join><namespace><variable_suffix>"` |

#### `key`

`<string.secret>` Pipedream SDK key; To obtain it, select workflow trigger with "SDK"; It is impossible to regenerate it unless create a new workflow.

#### `variable_join`

**\[Optional\]** `<string = "_">` Variable join if the variable list has depth.

#### `variable_list_external`

**\[Optional\]** `<object.json>` External variable list that will use in the data; Can import from other actions' output.

#### `variable_prefix`

**\[Optional\]** `<string = "%">` Variable prefix.

#### `variable_suffix`

**\[Optional\]** `<string = "%">` Variable suffix.

#### `payload`

**\[V\]** `<(string|object.json)>` Payload that need to send to Pipedream.
- **Externally:** A relative JSON, JSONC, YAML, or YML file path (end with `.json`, `.jsonc`, `.yaml`, or `.yml`) which in the same repository, file size must smaller than 1 MB (restricted by GitHub).
- **Locally:** A stringify JSON paste in here.

#### `github_token`

**\[Optional\]** `<string.secret = "${{github.token}}">` GitHub personal access token; Only use when need to fetch the file specify in the argument [`payload`](#payload).

### 📤 Output

*(N/A)*

### Example

```yml
jobs:
  send-to-pipedream:
    name: "Send To Pipedream"
    runs-on: "ubuntu-latest"
    steps:
      - uses: "hugoalh/GitHubAction.SendToPipedream@v1.0.0"
        with:
          key: "${{secrets.PIPEDREAM_SDK_KEY}}"
          variable_join: "."
          # variable_list_external:
          variable_prefix: "%"
          variable_suffix: "%"
          payload: "{\"message\": \"Hello, world!\"}"
```

### 📚 Guide

- [GitHub Actions: Enabling debug logging](https://docs.github.com/en/free-pro-team@latest/actions/managing-workflow-runs/enabling-debug-logging)
- [GitHub Actions: Encrypted secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)
- [GitHub: Webhook events and payloads](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhook-events-and-payloads)
