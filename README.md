## 构建流程
* 基于最新版本的next.js创建项目
```shell
pnpm dlx create-next-app@latest
```
* 引入shadcn作为组件样式
```shell
pnpm dlx shadcn@latest init
```
* 安装lefthook作为git钩子
```shell
pnpm add --save-dev lefthook
vim lefthook.yml
```
* 安装biomejs作为代码格式和lint工具
```shell
pnpm add --save-dev --save-exact @biomejs/biome
pnpm biome init
vim biome.json
```
* 安装commit-lint来检查提交信息格式
```shell
pnpm add --save-dev @commitlint/{config-conventional,cli}
pnpm add --save-dev cz-customizable
# 安装cz-customizable的配置文件
vim commitlint.config.js
vim .cz-config.js
```
