# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7f1b052b-e2ee-419a-aec0-e4591c9e4afe

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7f1b052b-e2ee-419a-aec0-e4591c9e4afe) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🎨 Styling & Design

Dit project volgt strikte styling guidelines voor consistentie. **Voordat je componenten maakt of wijzigt:**

📖 **Lees [STYLING_GUIDELINES.md](./STYLING_GUIDELINES.md)** - Complete typografie, kleuren, spacing en component styling standaarden

### Brand Kleuren

- **Oranje** `#F47340` - Accenten & CTAs
- **Donker Paars** `#230C47` - Tekst & titels
- **Licht Paars** `#352D8C` - Achtergronden & gradients
- **Off-White** `#F7F5F2` - Default sectie achtergrond

### Typography Quick Reference

- **H2 titels**: `text-4xl md:text-5xl lg:text-6xl font-bold leading-tight`
- **H3 titels**: `text-2xl font-bold`
- **Body tekst**: `text-xl md:text-2xl leading-relaxed`
- **Minimaal**: `text-xl` voor leesbaarheid

### Logo Groottes

- Klein: `h-24` (96px)
- Medium: `h-32` (128px)
- Groot: `h-40` (160px)

⚠️ **Let op**: Gebruik GEEN groene kleuren - deze zitten niet in de brand guidelines. Gebruik `text-brand-orange` voor accenten, niet `text-accent`.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7f1b052b-e2ee-419a-aec0-e4591c9e4afe) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
