# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, Personalization


def send_email(template_id: str, sender_email: str, receiver_data: dict or list, send_to_multiple: bool = False) -> None:
    '''
    Send a personalized templated email to one or multiple receivers via SendGrid
    '''
    try:
        email_message = Mail()

        if send_to_multiple:
            if type(receiver_data) != list:
                raise TypeError(f'receiver_data expects {list}. Passed object has type {type(receiver_data)}')
            else:
                for r in receiver_data:
                    p = Personalization()
                    p.add_to(Email(email=r['email'], dynamic_template_data=r))
                    email_message.add_personalization(p)
        else:
            if type(receiver_data) != dict:
                raise TypeError(f'receiver_data expects {dict}. Passed object has type {type(receiver_data)}')
            else:
                p = Personalization()
                p.add_to(Email(email=receiver_data['email'], dynamic_template_data=receiver_data))
                email_message.add_personalization(p)
    
        email_message.from_email = sender_email
        email_message.template_id = template_id

        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(email_message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
