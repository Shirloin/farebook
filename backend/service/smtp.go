package service

import (
	"fmt"
	"net/smtp"
	"strings"

	"github.com/shirloin/backend/helper"
)

var from = helper.GoDotEnvVariable("EMAIL")
var pwd = helper.GoDotEnvVariable("PASSWORD")
var host = "smtp.gmail.com"
var port = "587"
var domname = "http://localhost:5173"

func SendEmail(to, verificationURL string) error {
	// body := fmt.Sprintf("Click the following link to verify your account %s", verificationURL)
	// body := fmt.Sprintf("From: %s\r\n", from) + fmt.Sprintf("To: %s\r\n", to)
	parts := strings.SplitN(to, "@", 2)
	body := `
	<html>
		<h1>Click Link to VerifyEmail</h1>
		<a href="` + domname + `/verification/` + parts[0] + `">Click to verify email</a>
	</html>`

	msg := []byte(fmt.Sprintf(
		"To: %s\r\n"+
			"Subject: Account Verification\r\n"+
			"MIME-Version: 1.0\r\n"+
			"Content-Type: text/html; charset=\"utf-8\"\r\n"+
			"\r\n"+
			"%s\r\n", to, body))

	auth := smtp.PlainAuth("", from, pwd, host)

	err := smtp.SendMail(fmt.Sprintf("%s:%s", host, port), auth, from, []string{to}, msg)
	if err != nil {
		fmt.Println("Error sending email:", err)
		return err
	}
	return nil
}
