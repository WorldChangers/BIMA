import postmark from 'postmark';

export default (user, token, req) => {
  const client = new postmark.Client(process.env.POSTMARK);

  return client.sendEmailWithTemplate({
    From: 'noreply@xhairgallery.com',
    To: user.email,
    TemplateId: 4161945,
    TemplateModel: {
      product_name: 'TripON Inc',
      name: user.name,
      action_url: `${req.headers.host}/users/forget/${token}`,
      support_url: 'http://tripon.com/support',
      company_name: 'TripON',
      company_address: '21 Pawpaw Street, East Legon',
    },
  });
};
