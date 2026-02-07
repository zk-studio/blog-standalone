# Blog Standalone Project

This project contains your Hexo blog source code, separated from the main website project.
It is configured for automated deployment to GitHub Pages using GitHub Actions.

## Setup Instructions

1.  **Create a New Repository on GitHub**:
    -   Go to https://github.com/new
    -   Name it (e.g., `my-blog` or just `username.github.io`).

2.  **Initialize Git and Push**:
    -   Open a terminal in this directory (`d:\xiangmu\blog-standalone`).
    -   Run the following commands:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        # Replace USERNAME and REPO with your GitHub details
        git remote add origin https://github.com/USERNAME/REPO.git
        git branch -M main
        git push -u origin main
        ```

3.  **Configure GitHub Pages**:
    -   Go to your repository **Settings** > **Pages**.
    -   Under **Source**, select **Deploy from a branch**.
    -   Set **Branch** to `gh-pages` (this branch will be created automatically by the GitHub Action after the first successful push).
    -   Save.

4.  **Important Configuration**:
    -   Edit `_config.yml`.
    -   Update `url` to your GitHub Pages URL (e.g., `https://username.github.io/my-blog`).
    -   Update `root` to your repository name (e.g., `/my-blog/`) or `/` if using a custom domain or user page.

## Workflow

-   Every time you push changes to the `main` branch, GitHub Actions will automatically:
    -   Install dependencies (`npm ci`).
    -   Build the site (`hexo generate`).
    -   Deploy the generated static files to the `gh-pages` branch.
