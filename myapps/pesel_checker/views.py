from django.views.generic import TemplateView


class PeselCheckerView(TemplateView):
    template_name = 'pesel_checker/pesel_checker.html'
