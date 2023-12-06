from flask import Flask, render_template, request, url_for

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        major_score = {'Computer Science': 0, 'Civil Engineering': 0, 'Chemistry': 0}
        
        #Update scores based on user's answers
        major_score[request.form.get('q1')] += 1
        major_score[request.form.get('q2')] += 1
        major_score[request.form.get('q3')] += 1
        major_score[request.form.get('q4')] += 1

        # Sort majoers based on score (descending Order)
        sorted_majors = sorted(major_score.items(), key=lambda x: x[1], reverse=True)
       
        ordered_majors = [major[0] for major in sorted_majors]
        

        return render_template('results.html', ordered_majors=ordered_majors)
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)