# HackUCI-Site

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## First-Time Setup

This project combines a Next.js frontend with a Python API.

### Next.js

1. Install dependencies
   ```shell
   npm ci
   ```

### Python API

1. Create a virtual environment

   ```shell
   python3 -m venv .venv --prompt HackUCI-Site
   ```

2. Activate virtual environment

   VS Code may prompt to automatically select the newly created virtual environment. Otherwise, run

   ```shell
   source .venv/bin/activate
   ```

3. Install dependencies
   ```shell
   pip install -r requirements.txt -r requirements-dev.txt
   ```

## Running Development Environment

Run the Next.js development server

```shell
npm run dev
# or
yarn dev
```

Run the FastAPI app with uvicorn

```shell
python3 src/app/dev.py
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
