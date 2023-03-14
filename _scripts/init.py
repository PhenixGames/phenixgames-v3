from initEnv import main
from initGitHooks import mainGitHooks
from initLogs import mainLogs

def init():
    main()
    mainGitHooks()
    mainLogs()

init()
