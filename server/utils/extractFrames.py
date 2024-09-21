import cv2
import os


face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def remove_similar_frames_with_faces(video_path, output_folder, threshold=200):
  
    os.makedirs(output_folder, exist_ok=True)

    cap = cv2.VideoCapture(video_path)

 
    fps = cap.get(cv2.CAP_PROP_FPS)

  
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    output_video = cv2.VideoWriter('output_video.mp4', fourcc, fps, (width, height))

    
    _, prev_frame = cap.read()

    while True:

        ret, frame = cap.read()

        if not ret:
            break 

        
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)
        diff = cv2.absdiff(prev_frame, frame)
        gray_diff = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
        _, thresh_diff = cv2.threshold(gray_diff, threshold, 255, cv2.THRESH_BINARY)
        non_zero_pixels = cv2.countNonZero(thresh_diff)

        if non_zero_pixels > threshold and len(faces) > 0:
            output_video.write(frame)
            cv2.imwrite(f'{output_folder}/frame_{int(cap.get(cv2.CAP_PROP_POS_FRAMES))}.png', frame)

    
        prev_frame = frame

    cap.release()
    output_video.release()

