import pymongo
import serial
import time

# Replace with your MongoDB Atlas connection string
connection_string = "mongodb+srv://akkadbakkad:akkadbakkad@cluster0.3dxvitq.mongodb.net/"

# Replace with your database and collection names
db_name = "sensors"
collection_name = "s1"

# Initialize MongoDB client
client = pymongo.MongoClient(connection_string)
db = client[db_name]
collection = db[collection_name]

# Initialize serial connection to Arduino
ser = serial.Serial('COM9', 9600)  # Adjust the port as needed

while True:
    # Read distance data from Arduino
    arduino_data = ser.readline().decode().strip()
    
    try:
        distance = float(arduino_data)
        timestamp = time.time()

        # Create a document to insert into the collection
        sensor_data = {
            "distance_cm": distance,
            "timestamp": timestamp
        }

        # Insert data into MongoDB
        collection.insert_one(sensor_data)

        print("Inserted data:", sensor_data)

    except ValueError:
        print("Invalid data received from Arduino:", arduino_data)

    time.sleep(1)  # Wait for some time before reading and inserting data again