import os

def mainGitHooks(): 
    print("Starting for Git Hooks")
    userWantToAdd = input('Möchtest du die GitHooks (pre-commit & pre-push) zu deinem Projekt hinzufügen? (y/n)')

    if userWantToAdd.lower() == 'y':
        copyFiles()
        print("Files copied to .git/hooks/ successfully")

    print("Finished GitHooks")
    return


def copyFiles():
    files = 'pre-commit .git/hooks/'
    try:
        os.popen('cp {}'.format(files))
    except:
        os.popen('copy {}'.format(files))
        