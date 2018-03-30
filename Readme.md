## React Native Course  - ToDo App task ##

A simple ToDo app to demonstrate react native capabilities 
### Installation ###
##### 1. Install and run backend ##### 
	*. create virtualenv and activate it
	1. cd backend/ToDoRNA
	2. pip install -r requirements.txt
	3. python manage.py migrate
	4. python manage.py runserver
	
##### 2. Install and link react stuff #####
	1. npm install
	2. react-native link
	3. rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
	
##### 3. Run #####
	react-native run-ios