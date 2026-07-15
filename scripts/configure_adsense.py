#!/usr/bin/env python3
"""Enable AdSense with a verified publisher ID and optional manual ad slot."""

import re
import sys
from pathlib import Path


def main():
    if len(sys.argv) not in (2, 3):
        raise SystemExit("usage: configure_adsense.py ca-pub-0000000000000000 [manual-slot-id]")

    publisher_id = sys.argv[1].strip()
    if not re.fullmatch(r"ca-pub-\d{16}", publisher_id):
        raise SystemExit("publisher ID must match ca-pub- followed by 16 digits")

    slot_id = sys.argv[2].strip() if len(sys.argv) == 3 else ""
    if slot_id and not re.fullmatch(r"\d+", slot_id):
        raise SystemExit("manual slot ID must contain digits only")

    root = Path(__file__).resolve().parent.parent
    config = (
        "window.ADSENSE_CONFIG = {\n"
        "  enabled: true,\n"
        f'  publisherId: "{publisher_id}",\n'
        "  manualSlots: {\n"
        f'    afterMap: "{slot_id}"\n'
        "  }\n"
        "};\n"
    )
    (root / "adsense-config.js").write_text(config)
    numeric_id = publisher_id.removeprefix("ca-")
    (root / "ads.txt").write_text(f"google.com, {numeric_id}, DIRECT, f08c47fec0942fa0\n")
    print("AdSense configuration and ads.txt updated.")


if __name__ == "__main__":
    main()
