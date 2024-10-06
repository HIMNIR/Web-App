# The Project (COMP3512 Winter 2024)

**Student**:  https://scaling-space-memory-qjgw5x9gw75f9grp.github.dev/ 
**GCP URL**: 35.229.76.52

---

## COMP3512 - Codespace Base Template

A Codespace with these features:

### LAMPish
| Name    | Version                        |
|---------|--------------------------------|
| Linux   | Debian GNU/Linux 11 (bullseye) |
| Apache  | 2.4.56 (Debian)                |
| MariaDB | 15.1 Distribution 10.5.21      |
| PHP     | 8.2.13 (cli)                   |

### Node
- Node 20.10.0
- NPM 10.2.3

### Workspace-specific Extensions
These are all installed via `devcontainer.json`.

| Identifier                            | Name               | Purpose                                  |
|---------------------------------------|--------------------|------------------------------------------|
| bmewburn.vscode-intelephense-client   | Intelephense       | Code completion, linting, formatting.    |
| cweijan.vscode-database-client2       | Database Client    | GUI-ish DB admin tool. Replaces DBeaver. |
| esbenp.prettier-vscode                | Prettier           | Formatting JS.                           |
| neilbrayfield.php-docblocker          | PHP DocBlocker     | New 2024. PHP documentation tool.        |
| rangav.vscode-thunder-client          | Thunder Client     | Rest API tool.                           |
| ritwickdey.liveserver                 | Live Server        | See changes to code in browser on save.  |
| streetsidesoftware.code-spell-checker | Code Spell Checker | No excuses for poor spelling.            |
| xdebug.php-debug                      | PHP Debug          | Makes PHP debugging possible.            |

ESLint and Prettier are also brought in via the `package.json`.

