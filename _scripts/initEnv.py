def main():
    fileData = []
    lastFile = ''

    # Definiere eine Funktion, die Fragen stellt und die Antworten des Benutzers in einer Liste zurückgibt
    def ask_questions(question, default):
        response = input(question + ' (default: ' + str(default) + '): ')
        if response == '':
            return default
        else:
            return response

    def appendFileData(filedata, data, file):
        if file == '.env':
            filedata.append('{}={}'.format(data['name'], data['data']))
            
        elif file == 'client_packages/_config/config.js':
            filedata = data['name']

        return filedata

    def create_file(file_name):
        string = ''

        if type(fileData) == list:
            for item in fileData:
                string += item + '\n'
        else:
            string = fileData

        
        with open(file_name, 'w') as f:
            f.write(string) # type: ignore
        
        print('Created file: ' + file_name + ' with content: ' + string)


    questions_and_targets = [
        {'question': 'Servername', 'target_file': '.env', 'default': 'PhenixGames', 'name': 'SERVER_NAME'},
        {'question': 'Database Host', 'target_file': '.env', 'default': 'mysql', 'name': 'DB_HOST'},
        {'question': 'Database User', 'target_file': '.env', 'default': 'phenixgames', 'name': 'DB_USER'},
        {'question': 'Database Password', 'target_file': '.env', 'default': 'root', 'name': 'DB_PWD'},
        {'question': 'Database Name', 'target_file': '.env', 'default': 'phenixgames-v3', 'name': 'DB_Name'},
        {'question': 'Database Debug', 'target_file': '.env', 'default': 'false', 'name': 'DB_DEBUG'},
        {'question': 'Weather API Key', 'target_file': '.env', 'default': '', 'name': 'WEATHER_KEY'},
        {'question': 'Vue App Domain', 'target_file': '.env', 'default': '127.0.0.1', 'name': 'VUE_APP_DOMAIN'},

        {'question': 'Vue App Domain (Config)', 'target_file': 'client_packages/_config/config.js', 'default': '192.168.1.210', 'name': 'exports.config = {domain: "{}"}', 'data': ['192.168.1.210']},
    ]

    for item in questions_and_targets:
        question = item['question']
        default = item['default']
        name = item['name']
        try:
            data = item['data']
        except:
            data = None

        if lastFile != item['target_file'] and lastFile != '':
            create_file(lastFile)
            fileData = []

        target_file = item['target_file']
        lastFile = target_file

        answers = ask_questions(question, default)

        if data: 
            name = name.replace('{}', answers)
        
        fileData = appendFileData(fileData, {'name': name, 'data': answers}, target_file)

        if item == questions_and_targets[-1]:
            create_file(target_file)
        