"""Dien een sitemap in bij Google Search Console.

Het meegeleverde gsc_query.py kan sitemaps alleen uitlezen. Dit script doet de
schrijfkant: een PUT op de Search Console API. Het leent de tokenafhandeling
van google_auth.py uit de seo-skill, want die ververst een verlopen token via
alleen de standaardbibliotheek. Zo is google-auth hier niet nodig.
"""

import os
import sys
import json
import urllib.parse
import urllib.request
import urllib.error

sys.path.insert(0, os.path.expanduser("~/.claude/skills/seo/scripts"))
import google_auth as ga


def fresh_access_token() -> str:
    """Geeft een geldig access token terug, ververst als het verlopen is."""
    token = ga._load_oauth_token()
    if not token or not token.get("access_token"):
        sys.exit("Geen OAuth-token gevonden. Draai eerst google_auth.py --auth")

    import time

    if time.time() > token.get("expires_at", 0) - 60:
        config = ga.load_config()
        client_path = config.get("oauth_client_path")
        if not client_path:
            sys.exit("Geen oauth_client_path in de config, verversen kan niet.")
        client = ga._load_oauth_client(client_path)
        token = ga._refresh_oauth_token(client, token)
        if not token:
            sys.exit("Verversen mislukt. Draai google_auth.py --auth opnieuw.")
        print("  (token ververst)")

    return token["access_token"]


def submit(site: str, sitemap: str, token: str) -> None:
    url = (
        "https://www.googleapis.com/webmasters/v3/sites/"
        f"{urllib.parse.quote(site, safe='')}/sitemaps/"
        f"{urllib.parse.quote(sitemap, safe='')}"
    )
    req = urllib.request.Request(url, method="PUT")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Length", "0")
    try:
        with urllib.request.urlopen(req) as resp:
            # Google geeft 204 No Content bij succes.
            print(f"  HTTP {resp.status} -- ingediend: {sitemap}")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        sys.exit(f"  MISLUKT HTTP {e.code}: {body}")


def show(site: str, token: str) -> None:
    url = (
        "https://www.googleapis.com/webmasters/v3/sites/"
        f"{urllib.parse.quote(site, safe='')}/sitemaps"
    )
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req) as resp:
        data = json.load(resp)

    entries = data.get("sitemap", [])
    if not entries:
        print("  (nog geen sitemaps geregistreerd)")
        return

    for sm in entries:
        print(f"  {sm.get('path')}")
        print(f"      type          : {sm.get('type', '?')}")
        print(f"      laatst opgehaald: {sm.get('lastDownloaded', 'nog niet')}")
        print(f"      in behandeling  : {sm.get('isPending')}")
        print(f"      fouten / waarschuwingen: {sm.get('errors', 0)} / {sm.get('warnings', 0)}")
        for c in sm.get("contents", []):
            print(f"      {c.get('type')}: {c.get('submitted')} ingediend, {c.get('indexed', 'n/b')} geindexeerd")


if __name__ == "__main__":
    SITE = "sc-domain:innerleaps.nl"
    SITEMAP = "https://innerleaps.nl/sitemap.xml"

    tok = fresh_access_token()
    print("=== Indienen ===")
    submit(SITE, SITEMAP, tok)
    print("\n=== Status na indienen ===")
    show(SITE, tok)
