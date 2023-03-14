import os

def mainLogs():
    print("Creating all Log folders...")
    rootLogFolder = '_logs'
    errorLogFolder = rootLogFolder+'/error_log'
    debugLogFolder = rootLogFolder+'/debug_log'
    databaseLogFolder = rootLogFolder+'/database_log'

    if not os.path.exists(rootLogFolder):
        os.makedirs(rootLogFolder)

    if not os.path.exists(errorLogFolder):
        os.makedirs(errorLogFolder)

    if not os.path.exists(debugLogFolder):
        os.makedirs(debugLogFolder)

    if not os.path.exists(databaseLogFolder):
        os.makedirs(databaseLogFolder)
    
    print("Created all Log folders")
    