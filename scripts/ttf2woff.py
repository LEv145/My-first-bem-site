import subprocess
import sys
from pathlib import Path


EXTENTION = ".ttf"


def main(argv: list[str]) -> None:
    directory = argv[1]

    for i in Path(".").glob(f"{directory}/*{EXTENTION}"):
        subprocess.run(["npx", "ttf2woff", str(i), f"{str(i)[:-len(EXTENTION)]}.woff"], shell=True)
        subprocess.run(["rm", str(i)], shell=True)

if __name__ == "__main__":
    main(sys.argv)
